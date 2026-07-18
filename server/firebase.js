const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'firebase-service-account.json');
let db, admin;

if (fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.log('[Firebase] Found service account file. Initializing Firebase Admin...');
  admin = require('firebase-admin');
  const serviceAccount = require(SERVICE_ACCOUNT_PATH);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  db = admin.firestore();
} else {
  console.log('[Firebase] Service account not found. Using IN-MEMORY mock store.');
  // Mock store implementation
  const memoryStore = {};

  db = {
    _store: memoryStore,
    collection: (name) => {
      if (!memoryStore[name]) memoryStore[name] = [];
      const coll = memoryStore[name];
      return {
        add: async (data) => {
          const id = uuidv4();
          const docData = { ...data };
          coll.push({ id, data: docData });
          return { id };
        },
        doc: (id) => {
          return {
            get: async () => {
              const doc = coll.find(d => d.id === id);
              if (doc) {
                return { id, exists: true, data: () => ({ ...doc.data }) };
              }
              return { id, exists: false, data: () => undefined };
            },
            set: async (data, options = {}) => {
              const idx = coll.findIndex(d => d.id === id);
              if (idx > -1) {
                if (options && options.merge) {
                   coll[idx].data = { ...coll[idx].data, ...data };
                } else {
                   coll[idx].data = { ...data };
                }
              } else {
                coll.push({ id, data: { ...data } });
              }
            },
            update: async (data) => {
              const idx = coll.findIndex(d => d.id === id);
              if (idx > -1) {
                coll[idx].data = { ...coll[idx].data, ...data };
              } else {
                throw new Error("Document not found");
              }
            },
            delete: async () => {
              const idx = coll.findIndex(d => d.id === id);
              if (idx > -1) {
                coll.splice(idx, 1);
              }
            }
          };
        },
        orderBy: (field, direction = 'asc') => {
          const sorted = [...coll].sort((a, b) => {
            let valA = a.data[field];
            let valB = b.data[field];
            if (valA === valB) return 0;
            const res = valA < valB ? -1 : 1;
            return direction === 'desc' ? -res : res;
          });
          return {
            get: async () => {
              return {
                docs: sorted.map(doc => ({ id: doc.id, data: () => ({ ...doc.data }), exists: true }))
              };
            }
          };
        },
        get: async () => {
           return {
             docs: coll.map(doc => ({ id: doc.id, data: () => ({ ...doc.data }), exists: true }))
           };
        }
      };
    },
    runTransaction: async (callback) => {
      // Mock transaction that collects writes and executes them
      const pendingWrites = [];
      const transaction = {
        get: async (docRef) => await docRef.get(),
        update: (docRef, data) => {
          pendingWrites.push(() => docRef.update(data));
          return transaction;
        },
        set: (docRef, data, opts) => {
          pendingWrites.push(() => docRef.set(data, opts));
          return transaction;
        },
        delete: (docRef) => {
          pendingWrites.push(() => docRef.delete());
          return transaction;
        }
      };
      const result = await callback(transaction);
      // Execute all pending writes
      for (const write of pendingWrites) {
        await write();
      }
      return result;
    }
  };
  admin = { isMock: true };
}

module.exports = { db, admin };
