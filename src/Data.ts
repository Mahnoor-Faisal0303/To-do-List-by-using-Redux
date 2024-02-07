export const fakeLoginData = [
  { 
    id: "1",
    email: "abc@gmail.com",
    password: "abc",
  },
  { id:"2",
    email: "def@gmail.com",
    password: "def",
  },
  { id:"3",
    email: "ghi@gmail.com",
    password: "ghi",
  },
  { id:"4",
    email: "a",
    password: "a",
  },
];

//1. signup success ---> local storage get --->key undefined----push array
//2. login -----storage get----- conditions----->key logedin user,---->save---->navigate