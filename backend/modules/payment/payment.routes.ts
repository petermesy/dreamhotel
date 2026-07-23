import { Router } from 'express';
import { initializePayment, verifyPayment } from './payment.controller';

const router = Router();

router.post("/initialize", initializePayment);

router.get("/verify/:txRef", verifyPayment);

export default router;
