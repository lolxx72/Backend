import { Router } from "express";
import { cManager } from "../utils.js";

const carts = cManager();

const router = Router();

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  let findCart = await carts.findCart(cid);
  try {
    if (!findCart) {
      res.send(`No hay carrito con ID: ${cid.toUpperCase()}`);
    } else {
      res.status(200).send(findCart);
    }
  } catch {
    res.status(400).send("error");
  }
});

router.post("/", async (req, res) => {
  try {
    let cart = await carts.crateCart();
    res.status(200).send(cart);
  } catch {
    res.status(400).send("error");
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const find = await carts.addProduct(cid, pid);
    res.status(200).send(find);
  } catch {
    res.status(400).send("error");
  }
});

export default router;
