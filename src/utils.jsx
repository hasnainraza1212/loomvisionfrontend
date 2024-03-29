export const APIKEY= "AIzaSyDXbrdKtPud0QIfwYfTzb3yp0FFigIPjvY"

export const chats = [
    {
      _id: "1",
      isGroupChat: true,
      groupName: "oneDegree",
      users: [
        { _id: "1", name: "hasnain" },
        { _id: "2", name: "osama" },
        { _id: "3", name: "moiz" },
        { _id: "4", name: "ibrahim" },
      ],
      groupIcon: "oneDegree",
      admin: [{ _id: "1", name: "hasnain" }],
      lastMessage: {
        sender: {
            _id:"4",
            name:"ibrahim"
        },
        content: "shah kaha ho?",
        chatId: "1",
      },
    },
    {
      _id: "2",
      isGroupChat: true,
      groupName: "malirwaly",
      users: [
        { _id: "1", name: "hasnain" },
        { _id: "2", name: "shaheer" },
        { _id: "3", name: "moiz" },
      ],
      groupIcon: "malirwaly",
      admin: [{ _id: "2", name: "shaheer" }],
      lastMessage: {
         sender: {
            _id:"2",
            name:"shaheer"
        },
        content: "mai nikl gaya hon",
        chatId: "2",
      },
    },
    {
      _id: "3",
      isGroupChat: true,
      groupName: "schoolFriends",
      users: [
        { _id: "1", name: "hasnain" },
        { _id: "5", name: "talha" },
        { _id: "6", name: "ahmed" },
        { _id: "7", name: "ghadeer" },
      ],
      groupIcon: "schoolFriends",
      admin: [{ _id: "7", name: "ghadeer" }],
      lastMessage: {
         sender: {
            _id:"7",
            name:"ghadeer"
        },
        content: "kb milna ha ?",
        chatId: "3",
      },
    },
    {
      _id: "4",
      isGroupChat: true,
      groupName: "freelancers",
      users: [
        { _id: "1", name: "hasnain" },
        { _id: "2", name: "osama" },
        { _id: "3", name: "moiz" },
        { _id: "4", name: "ibrahim" },
      ],
      groupIcon: "freelancers",
      admin: [{ _id: "1", name: "hasnain" },
              { _id: "3", name: "moiz" },
              { _id: "4", name: "ibrahim" },
            ],
      lastMessage: {
         sender: {
            _id:"4",
            name:"ibrahim"
        },
        content: "project mila?",
        chatId: "4",
      },
    },
    {
      _id: "5",
      isGroupChat: true,
      groupName: "smit",
      users: [
        { _id: "1", name: "hasnain" },
        { _id: "8", name: "ibad" },
        { _id: "9", name: "arham" },
        { _id: "10", name: "osama" },
      ],
      groupIcon: "smit",
      admin: [{ _id: "8", name: "ibad" },
              { _id: "1", name: "hasnain" },],
      lastMessage: {
         sender: {
            _id:"9",
            name:"arham"
        },
        content: "jni milo tu sahi?",
        chatId: "5",
      },
    },
    {
      _id: "6",
      isGroupChat: false,
      groupName: "",
      users: [
        { _id: "1", name: "hasnain" },
        { _id: "4", name: "ibrahim" },
      ],
      groupIcon: "",
      admin: [],
      lastMessage: {
         sender: {
            _id:"4",
            name:"ibrahim"
        },
        content: "shah marksheet wala mark sheet ni de raha ?",
        chatId: "6",
      },
    },
  
    {
      _id: "7",
      isGroupChat: false,
      groupName: "",
      users: [
        { _id: "1", name: "hasnain" },
        { _id: "2", name: "osama" },
      ],
      groupIcon: "",
      admin: [],
      lastMessage: {
         sender: {
            _id:"2",
            name:"osama"
        },
        content: "hasnain parh raha ha na ni to mera kaam kar de?",
        chatId: "",
      },
    },
  
    {
      _id: "8",
      isGroupChat: false,
      groupName: "",
      users: [
        { _id: "3", name: "moiz" },
        { _id: "2", name: "osama" },
      ],
      groupIcon: "",
      admin: [],
      lastMessage: {
         sender: {
            _id:"3",
            name:"moiz"
        },
        content: "mai ni aonga?",
        chatId: "",
      },
    },
  ];
  