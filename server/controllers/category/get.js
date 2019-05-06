const { get } = require('@server/services/category');
const { graphLookUp } = require('@server/services/category');

exports.get = async (req, res) => {
   try {
      let category;
      if(req.query.get === 'hierarchical') {
         category = await graphLookUp();
         for(let i = 0, parentLength = category.length; i < parentLength; i++) {
            if(category[i].children.length) {
               for(let j = 0, childLength = category[i].children.length; j< childLength; j++) {
                  category[i].children[j].children = [];
                  let cat = await get({ parent: category[i].children[j]._id }, false);
                  category[i].children[j].children.push(...cat);
               }
            }
         }
      } else {
         category = await get({}, false);
      }

      return res.send({ status: 200, message: 'Fetched category', data: category });
   } catch(e) {
      return res.send({ status: 500, message: 'Server Error', error: e.message });
   }
};

exports.getBySlug = async (req, res) => {
   try {
      console.log(req.params.slug);
      let category = await get({ slug: req.params.slug });
      return res.send({ status: 200, message: 'Category Fetched', data: category });
   } catch(e) {
      return res.send({ status: 500, message: 'Server Error', error: e.message });
   }
};