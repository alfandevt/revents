import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../store/store';
import { GenericActions } from '../../store/genericSlice';
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-toastify';

type ListenerState = {
  name: string;
  unsubscribe(): void;
};

export function useFirestore<T extends DocumentData>(path: string) {
  const listenerRef = useRef<ListenerState[] | null>(null);

  useEffect(() => {
    let listenerRefValue: ListenerState[] | null = null;

    if (listenerRef.current) {
      listenerRefValue = listenerRef.current;
    }

    return () => {
      if (listenerRefValue) {
        listenerRefValue.forEach((listener) => {
          listener.unsubscribe();
        });
      }
    };
  }, []);

  const dispatch = useAppDispatch();

  const loadCollection = useCallback(
    (actions: GenericActions<T>) => {
      dispatch(actions.loading());

      const query = collection(db, path);

      const listener = onSnapshot(query, {
        next(querySnapshot) {
          const data: DocumentData[] = [];
          if (querySnapshot.empty) {
            dispatch(actions.success(data as unknown as T));
            return;
          }
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          dispatch(actions.success(data as unknown as T));
        },
        error(error) {
          dispatch(actions.error(error.message));
          console.log('Collection error: ', error.message);
        },
      });

      listenerRef.current?.push({ name: path, unsubscribe: listener });
    },
    [dispatch, path]
  );

  const loadDocument = useCallback(
    (id: string, actions: GenericActions<T>) => {
      dispatch(actions.loading());
      const docRef = doc(db, path, id);

      const listener = onSnapshot(docRef, {
        next(doc) {
          if (!doc.exists) {
            dispatch(actions.error('Document does not exists'));
            return;
          }
          dispatch(
            actions.success({ id: doc.id, ...doc.data() } as unknown as T)
          );
        },
      });

      listenerRef.current?.push({
        name: `${path}/${id}`,
        unsubscribe: listener,
      });
    },
    [dispatch, path]
  );

  async function create(data: T) {
    try {
      const ref = doc(collection(db, path));
      await setDoc(ref, data);
      return ref;
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  async function update(id: string, data: T) {
    const docRef = doc(db, path, id);
    try {
      return await updateDoc(docRef, data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  async function remove(id: string) {
    const docRef = doc(db, path, id);
    try {
      return await deleteDoc(docRef);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  async function set(id: string, data: any) {
    try {
      return await setDoc(doc(db, path, id), data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return { loadCollection, loadDocument, create, update, remove, set };
}
