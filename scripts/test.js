const jest = require("jest");

jest.run()
    .then(success => {
        console.log(success);
    })
    .catch(failure => {
        console.error(failure);
    });
