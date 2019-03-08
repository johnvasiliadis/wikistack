const express = require("express");
const router = express.Router();

const { Page } = require('../models')
const { addPage } = require('../views')
// const wikiList = require("../views/main");

router.use(express.urlencoded({ extended: false }))


router.get("/", (req, res) => {
    // res.send('get wiki');
    res.redirect("/");
})

router.post("/", async (req, res, next) => {

    let name = req.body.name;
    let title = req.body.title;
    let content = req.body.content;
    let status = req.body.status;

    // console.log(name);
    // console.log(title);
    // console.log(content);
    // console.log(status);


    // STUDENT ASSIGNMENT:
    // add definitions for `title` and `content`
    let regex = /[^A-Za-z0-9 ]/gi
    let regex2 = /[' ']/gi
    let slug = title.replace(regex, '').replace(regex2, '_')

    // console.log(slug);


  const page = new Page({
    title: title,
    content: content,
    slug: slug
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});


router.get("/add", (req, res, next) => {
    res.send(addPage());
});



module.exports = router;
