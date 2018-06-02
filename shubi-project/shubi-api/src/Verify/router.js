const router = require('koa-router')();
import { sms, email } from './controllers/sms';
import { verifyToken } from './controllers/email';

router.prefix('/verify');

/**
 */
router.get('/sms', sms);
router.get('/email', email);
router.get('/token', verifyToken);

module.exports = router;