define(['jquery', 'sugar'], function ($, sugar) {

  /* == Awesootup Module definition ========================================= */

  /* Constructor */
  function AwesootupModule(name, desc, provides, pre_reqs, post_reqs, author) {

    this.name = name;

    this.desc = desc;

    this.provides = provides;

    this.pre_reqs = pre_reqs;

    this.post_reqs = post_reqs;

    if (!(Object.isObject(author))) {
      this.author = {
        'name': (author == undefined) ? null : author.toString(),
        'email': null,
        'website': null
      };
    } else {
      this.author = author;
      if (!(Object.has(author, 'name'))) {
        this.author['name'] = null;
      }
      if (!(Object.has(author, 'email'))) {
        this.author['email'] = null;
      }
      if (!(Object.has(author, 'name'))) {
        this.author['name'] = null;
      }
    }
  }

  /* Method: Compute and return the uri */
  AwesootupModule.prototype.get_uri = function () {
    return "/awesootup/modules/" + this.name + ".html";
  };

  /* Method: Return the name */
  AwesootupModule.prototype.get_name = function () {
    return this.name;
  };

  /* Method: Return the description */
  AwesootupModule.prototype.get_desc = function () {
    return this.desc;
  };

  /* Method: Return what the module provides */
  AwesootupModule.prototype.get_provides = function () {
    return this.provides;
  };

  /* Method: Return the pre-requirements */
  AwesootupModule.prototype.get_pre_reqs = function () {
    return this.pre_reqs;
  };

  /* Method: Return the post-requirements */
  AwesootupModule.prototype.get_post_reqs = function () {
    return this.post_reqs;
  };

  /* Method: Return the module author */
  AwesootupModule.prototype.get_author = function () {
    return this.author;
  };


  /* == AwesootupModule export ============================================== */

  return {
    create_module: function (name, desc, provides, pre_reqs, post_reqs,
                             author) {
      return new AwesootupModule(name, desc, provides, pre_reqs, post_reqs,
          author);
    }
  };

});
