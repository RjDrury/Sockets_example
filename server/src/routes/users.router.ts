// const router = require('express').Router();
// import { db } from '../db/db';
// import { Request, Response } from 'express';
// import { User } from '../entities/user.entity';

// router.get('/', async function (req: Request, res: Response) {
//   const users = await db.getRepository(User).find();
//   res.json({ users, test: 'Hello world!' });
// });

// router.get('/:id', async function (req: Request, res: Response) {
//   const results = await db.getRepository(User).findOneBy({
//     id: +req.params.id
//   });
//   return res.send(results);
// });

// router.post('/', async function (req: Request, res: Response) {
//   const user = await db.getRepository(User).create(req.body);
//   const results = await db.getRepository(User).save(user);
//   return res.send(results);
// });

// router.put('/:id', async function (req: Request, res: Response) {
//   const user = await db.getRepository(User).findOneBy({
//     id: +req.params.id
//   });
//   db.getRepository(User).merge(user, req.body);
//   const results = await db.getRepository(User).save(user);
//   return res.send(results);
// });

// router.delete('/:id', async function (req: Request, res: Response) {
//   const results = await db.getRepository(User).delete(req.params.id);
//   return res.send(results);
// });

// module.exports = router;
