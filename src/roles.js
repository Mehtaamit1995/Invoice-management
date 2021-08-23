const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("Cashier")
 .readOwn("profile")
 .updateOwn("profile")
 
ac.grant("manager")
 .extend("Cashier")
 .readAny("profile").on("")
 .deleteAny("profile").on("Cashier")
 
ac.grant("SuperAdmin")
 .extend("Cashier")
 .extend("Manager")
 .createAny("profile")
 .updateAny("profile").on("Cashier").on("Manager")
 .deleteAny("profile").on("Cashier").on("Manager")
 

const permission = await ac.can('cashier').execute('create');
console.log(permission.granted);    
console.log(permission.attributes); 

  
permission = await ac.can('manager').execute('update');
console.log(permission.granted); 
console.log(permission.attributes);

 
permission = await ac.can('superadmin').execute('update');
console.log(permission.granted); 
console.log(permission.attributes);


// ------------- SuperAdmin rights ----------------

// ac.grant('user').condition(
//     {
//         Fn: 'EQUALS',
//         args: {
//             'requester': '$.owner'
//         }
//     }).execute('edit').on('article');

// permission =  await ac.can('user').context({ requester: 'dilip', owner: 'dilip' }).execute('edit').on('article'); // <-- Async Example
// console.log(permission.granted);


// ------------- Control check for Cashier -----------

ac.grant('Cashier').condition(
    {
        Fn: 'NOT_EQUALS',
        args: {
            'requester': '$.Superadmin'
        }
    }).execute('Edit').on('article');
 
  permission = await ac.can('Cashier').context({ requester: ' ', SuperAdmin: ' ' }).execute(' '); //  -- Async Example
console.log(permission.granted);






return ac;
})();