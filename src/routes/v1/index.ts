import express from 'express';
import apikey from '../../auth/apikey';
import notes from './notes/notes';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
router.use('/', apikey);
/*-------------------------------------------------------------------------*/

router.use('/notes', notes);

export default router;
