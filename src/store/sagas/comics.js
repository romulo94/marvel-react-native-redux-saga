import { call, select, put } from 'redux-saga/effects';
import api from '../../services/api';
import { publicKey, hash, ts } from '../../config/config';
import { Creators as ComicActions } from '../ducks/comics';

export function* addCommic() {
  const {
    comics: { offset, limit },
  } = yield select();
  const teste = yield select();
  try {
    const {
      data: { data },
    } = yield call(
      api.get,
      `/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=${limit}`,
    );

    yield put(ComicActions.addComicsSuccess(data));
  } catch (error) {
    yield put(
      ComicActions.addComicsFailure({
        publicKey,
        hash,
        ts,
        teste,
      }),
    );
  }
}
