const mock = {
  tasks: [
    {
      id: 0,
      type: "Meeting",
      title: "Meeting with Andrew Piker",
      time: "9:00"
    },
    {
      id: 1,
      type: "Call",
      title: "Call with HT Company",
      time: "12:00"
    },
    {
      id: 2,
      type: "Meeting",
      title: "Meeting with Zoe Alison",
      time: "14:00"
    },
    {
      id: 3,
      type: "Interview",
      title: "Interview with HR",
      time: "15:00"
    }
  ],
  bigStat: [
    {
      product: "Light Blue",
      total: {
        monthly: 4232,
        weekly: 1465,
        daily: 199,
        percent: { value: 3.7, profit: false }
      },
      color: "primary",
      registrations: {
        monthly: { value: 830, profit: false },
        weekly: { value: 215, profit: true },
        daily: { value: 33, profit: true }
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: true },
        daily: { value: 3.25, profit: true }
      }
    },
    {
      product: "Sing App",
      total: {
        monthly: 754,
        weekly: 180,
        daily: 27,
        percent: { value: 2.5, profit: true }
      },
      color: "warning",
      registrations: {
        monthly: { value: 32, profit: true },
        weekly: { value: 8, profit: true },
        daily: { value: 2, profit: false }
      },
      bounce: {
        monthly: { value: 2.5, profit: true },
        weekly: { value: 4, profit: false },
        daily: { value: 4.5, profit: false }
      }
    },
    {
      product: "RNS",
      total: {
        monthly: 1025,
        weekly: 301,
        daily: 44,
        percent: { value: 3.1, profit: true }
      },
      color: "secondary",
      registrations: {
        monthly: { value: 230, profit: true },
        weekly: { value: 58, profit: false },
        daily: { value: 15, profit: false }
      },
      bounce: {
        monthly: { value: 21.5, profit: false },
        weekly: { value: 19.35, profit: false },
        daily: { value: 10.1, profit: true }
      }
    }
  ],
  notifications: [
    {
      id: 0,
      icon: "thumbs-up",
      color: "primary",
      content:
        'Ken <span className="fw-semi-bold">accepts</span> your invitation'
    },
    {
      id: 1,
      icon: "file",
      color: "success",
      content: "Report from LT Company"
    },
    {
      id: 2,
      icon: "envelope",
      color: "danger",
      content: '4 <span className="fw-semi-bold">Private</span> Mails'
    },
    {
      id: 3,
      icon: "comment",
      color: "success",
      content: '3 <span className="fw-semi-bold">Comments</span> to your Post'
    },
    {
      id: 4,
      icon: "cog",
      color: "light",
      content: 'New <span className="fw-semi-bold">Version</span> of RNS app'
    },
    {
      id: 5,
      icon: "bell",
      color: "info",
      content:
        '15 <span className="fw-semi-bold">Notifications</span> from Social Apps'
    }
  ],
  table: {
    statusCode: 200,
    total: 187.54,
    statements: [
      {
        id: 0,
        name: "Churros and Tea",
        date: "11 May 2021",
        expiring: "11 Days",
        location: "Umhlanga,Durban North",
        audience: "Sweet,Cold",
        status: "Pending",
        cost: "R0",

      },
      {
        id: 1,
        name: "Chocolate cake and Coffee",
        date: "4 Jun 2021",
        expiring: "13 Days",
        location: "Umhlanga,Ballito",
        audience: "Sweet,Cold",
        status: "Declined",
        cost: "R0",
      },
      {
        id: 2,
        name: "Samoosa and Chai",
        date: "27 Aug 2021",
        expiring: "2 Months",
        location: "Fordsburg,Laudium",
        audience: "Sweet,Cold",
        status: "Pending",
        cost: "R0",

      },
      {
        id: 3,
        name: "Chicken Wings and Beer",
        date: "19 Feb 2021",
        expiring: "23 Days",
        location: "Umhlanga,Durban North",
        audience: "Sweet,Cold",
        status: "Declined",
        cost: "R0",

      },
      {
        id: 4,
        name: "Chicken Curry and Coke",
        date: "1 Mar 2021",
        expiring: "1 Month",
        location: "Fordsburg,Laudium",
        audience: "Sweet,Cold",
        status: "Approved",
        cost: "R43.59",
      },
      {
        id: 5,
        name: "Pizza and Wine",
        date: "1 Mar 2021",
        expiring: "1 Month",
        location: "Umhlanga,Durban North",
        audience: "Sweet,Cold",
        status: "Approved",
        cost: "R73.09",
      },
      {
        id: 6,
        name: "Koeksister and Tea",
        date: "1 Mar 2021",
        expiring: "1 Month",
        location: "Umhlanga,Ballito",
        audience: "Sweet,Cold",
        status: "Approved",
        cost: "R23.27",
      },
      {
        id: 7,
        name: "Chicken Strips and Coke",
        date: "1 Mar 2021",
        expiring: "1 Month",
        location: "Umhlanga,Ballito",
        audience: "Sweet,Cold",
        status: "Approved",
        cost: "R47.59",
      }
    ]
  }
};

export default mock;