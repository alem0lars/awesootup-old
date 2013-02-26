awesootup = require('app/awesootup');
awesootup_module = require('app/awesootup-module');
author = {name:'Alessandro Molari', email:'molari.alessandro@gmail.com', website:'http://molarialessandro.info'};

a = awesootup_module.create_module("A", "A Module", "a", [], [], author);
b = awesootup_module.create_module("B", "B Module", "b", ["a"], [], author);
c = awesootup_module.create_module("C", "C Module", "c", ["a"], [], author);
z = awesootup_module.create_module("Z", "Z Module", "z", [], ["a"], author);
awesootup.create_awesootup("My Guide", "This guide is beautiful", [a,b,c,z], author);
