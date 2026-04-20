export const STATUSES = [
  "Order Placed",
  "Confirmed",
  "Preparing",
  "Ready for Pickup",
  "Out for Delivery",
  "Delivered",
];

export const SEED_ORDERS = [
  {
    id:"IDT-2024-001", storeId:1, store:"Talim Ihaw-Ihaw",
    items:[
      {name:"Pork Inasal",       qty:2, price:120},
      {name:"Puso (Hanging Rice)",qty:2, price:20},
      {name:"Softdrinks",        qty:2, price:35},
    ],
    status:2, customer:"Maria Santos",  phone:"0917-123-4567",
    address:"Purok 3, Brgy. Talim",     time:"12:05 PM",
    total:350, fee:45, payment:"COD",   note:"",
  },
  {
    id:"IDT-2024-002", storeId:3, store:"Mama Luz Kitchen",
    items:[
      {name:"Adobo Combo", qty:2, price:95},
      {name:"Halo-Halo",   qty:1, price:65},
    ],
    status:0, customer:"Jose Reyes",    phone:"0918-987-6543",
    address:"Purok 1, Brgy. Ithan",     time:"12:32 PM",
    total:320, fee:35, payment:"GCash", note:"Extra sauce please",
  },
  {
    id:"IDT-2024-003", storeId:4, store:"Talim Bakery & Café",
    items:[
      {name:"Pandesal (6 pcs)", qty:3, price:30},
      {name:"Brewed Barako",   qty:2, price:55},
    ],
    status:5, customer:"Ana Cruz",      phone:"0920-111-2222",
    address:"Purok 5, Brgy. Talim",     time:"11:45 AM",
    total:275, fee:30, payment:"COD",   note:"",
  },
];

export const PICKUPS = [
  { id:"IDT-2024-004", from:"Isla Fresh Seafood",  fromAddr:"Purok 2 Main Road", to:"Purok 4, Brgy. Talim", distance:"1.4 km", earn:65, items:3, weight:"2.5 kg" },
  { id:"IDT-2024-005", from:"La Playa Burgers",     fromAddr:"Lakeside Strip",    to:"Purok 1, Brgy. Ithan", distance:"2.8 km", earn:80, items:2, weight:"1.2 kg" },
  { id:"IDT-2024-006", from:"Sari-Sari Express",    fromAddr:"Purok 3 Corner",    to:"Purok 6, Brgy. Talim", distance:"0.9 km", earn:45, items:6, weight:"3.0 kg" },
];

export const SEED_TRIPS = [
  {id:"IDT-001", from:"Talim Ihaw-Ihaw",  earn:65, time:"08:45 AM", km:"1.4"},
  {id:"IDT-002", from:"Mama Luz Kitchen",  earn:55, time:"09:30 AM", km:"0.9"},
  {id:"IDT-003", from:"Talim Bakery",      earn:45, time:"10:15 AM", km:"0.7"},
  {id:"IDT-004", from:"Sari-Sari Express", earn:80, time:"11:00 AM", km:"2.5"},
  {id:"IDT-005", from:"Island Halo-Halo",  earn:70, time:"12:30 PM", km:"1.8"},
];
