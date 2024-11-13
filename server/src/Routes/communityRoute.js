const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/multer');
const communityController = require('../Controllers/communityController');


/**
 * @swagger
 * /api/oouweb/communities/:
 *   post:
 *     summary: creating new communities
 *     tags: [Create communities]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *                 description: Community title
 *                 example: OOU Tech Community
 *               body:
 *                 type: string
 *                 description: Community body
 *                 example: We aim to build a vibrant tech community where members can solve realworld problems and contribute to the tech ecosystem
 *     responses:
 *       200:
 *         description: create new community
 *         content:
 *             application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: rsponse message
 *                     example: community created successfully
 *                   data:
 *                     type: object
 *                     description: created community data
 *                     example: {
 *                         id: 1,
 *                         image: "otc.png",
 *                         title: "OOUTECH Community",
 *                         body: "We aim to build a vibrant tech community where members can solve realworld problems and contribute to the tech ecosystem ",
 *                       }
 */
router.post("/", upload.single("image"), communityController.createCommunity);



/**
 * @swagger
 * /api/oouweb/communities/:
 *   get:
 *     summary:  getting all communities
 *     tags: [Fetch communities]
 *     responses:
 *       200:
 *         description: fetch all community
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: rsponse message
 *                     example: community fetched successfully
 *                   data:
 *                     type: object
 *                     description: created community data
 *                     example: {
 *                         id: 1,
 *                         image: "otc.png",
 *                         title: "OOUTECH Community",
 *                         body: "We aim to build a vibrant tech community where members can solve realworld problems and contribute to the tech ecosystem ",
 *                       }
 */
//getting all communities
router.get("/", communityController.getAllCommunities);

/**
 * @swagger
 * /api/oouweb/communities/data/:id:
 *   put:
 *     summary:  updating community data
 *     tags: [update communities data]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             properties:
 *               title:
 *                 type: string
 *                 description: Community title
 *                 example: OOU Tech Community
 *               body:
 *                 type: string
 *                 description: Community body
 *                 example: We aim to build a vibrant tech community where members can solve realworld problems and contribute to the tech ecosystem
 *     responses:
 *       200:
 *         description: create new community
 *         content:
 *             application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: response message
 *                     example: community updated successfully
 *                   data:
 *                     type: object
 *                     description: updated success
 *                     example: {
 *                         id: 1,
 *                         title: "OOUTECH Community",
 *                         body: "We aim to build a vibrant tech community where members can solve realworld problems and contribute to the tech ecosystem ",
 *                       }
 */
//updating community data
router.patch("/data/:id", communityController.updateCommunityData);


/**
 * @swagger
 * /api/oouweb/communities/image/:id:
 *   put:
 *     summary:  updating community image
 *     tags: [update communities image]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: create new community
 *         content:
 *             application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: rsponse message
 *                     example: community updated successfully
 *                   data:
 *                     type: object
 *                     description: updated success
 *                     example: {
 *                         id: 1,
 *                         title: "OOUTECH Community",
 *                         body: "We aim to build a vibrant tech community where members can solve realworld problems and contribute to the tech ecosystem ",
 *                       }
 */
//update community image
router.patch("/image/:id", upload.single("image"), communityController.updateCommunityImage);


/**
 * @swagger
 * /api/oouweb/communities/:id:
 *   delete:
 *     summary:  delete community
 *     tags: [Delete communities]
 *     responses:
 *       200:
 *         description: successfully deleted community
 *         content:
 *             application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: response message
 *                     example: community deleted successfully
 *                   data:
 *                     type: object
 *                     description: delete success
 *                     example: {
 *                         id: 1,
 *                         title: "OOUTECH Community",
 *                         body: "We aim to build a vibrant tech community where members can solve realworld problems and contribute to the tech ecosystem ",
 *                       }
 */
//update community image
//delete community
router.delete("/:id", communityController.deleteCommunity);

module.exports = router;