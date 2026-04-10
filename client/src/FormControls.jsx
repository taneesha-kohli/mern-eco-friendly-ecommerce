export const loginFormControls = [
  {
    label: 'Email',
    elementType: 'input',
    type: 'email',
    placeholder: 'Enter Email',
    name: 'email'
  },
   {
    label: 'Password',
    elementType: 'input',
    type: 'password',
    placeholder: 'Enter Password',
    name: 'password'
  }
]

export const registerFormControls = [
  {
    label: 'Username',
    elementType: 'input',
    type: 'text',
    placeholder: 'Enter Username',
    name: 'username'
  },
   {
    label: 'Email',
    elementType: 'input',
    type: 'email',
    placeholder: 'Enter Email',
    name: 'email'
  },
   {
    label: 'Password',
    elementType: 'input',
    type: 'password',
    placeholder: 'Enter Password',
    name: 'password'
  }
]


export const contactFormControls = [
  {
    label: 'Name',
    elementType: 'input',
    type: 'text',
    placeholder: 'Enter Username',
    name: 'username'
  },
   {
    label: 'Email',
    elementType: 'input',
    type: 'email',
    placeholder: 'Enter Email',
    name: 'email'
  },
   {
    label: 'Message',
    elementType: 'textarea',
    placeholder: 'Your Message',
    name: 'message'
  },

]



export const AdminLoginFormControls = [
   {
    label: 'Email',
    elementType: 'input',
    type: 'email',
    placeholder: 'Enter Email',
    name: 'email'
  },
   {
    label: 'Password',
    elementType: 'input',
    type: 'password',
    placeholder: 'Enter Password',
    name: 'password'
  }
]


export const ProductFormControls = [
  {
    label: 'Title',
    elementType: 'input',
    type: 'text',
    placeholder: 'Enter product title',
    name: 'title'
  },
  {
    label: 'Description',
    elementType: 'textarea',
    placeholder: 'Enter product description',
    name: 'description'
  },
  {
    label: 'Image URL',
    elementType: 'input',
    type: 'file',
    placeholder: 'Enter image URL',
    name: 'image'
  },
 {
  label: 'Category',
  elementType: 'select',
  name: 'category',
  options: [
    { label: 'Select category'},
    { label: 'Clothing', value: 'clothing' },
    { label: 'Footwear', value: 'footwear' },
    { label: 'Bags', value: 'bags' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Beauty & Personal Care', value: 'beauty & personal care' },
    { label: 'Home & Living', value: 'home & living' },
    { label: 'Reusable Products', value: 'reusable products' },
    { label: 'Kitchen & Dining', value: 'kitchen & dining' },
    { label: 'Fitness & Outdoor', value: 'fitness & outdoor' },
  ]
},

 {
  label: 'Brand',
  elementType: 'select',
  name: 'brand', 
  options: [
  { label: 'Select Brand' },
  { label: 'TerraStep', value: 'terrastep' },        // Footwear
  { label: 'CarryKind', value: 'carrykind' },        // Bags
  { label: 'BareForm', value: 'bareform' },          // Accessories
  { label: 'Root & Ritual', value: 'root & ritual' },  // Beauty
  { label: 'NestTheory', value: 'nesttheory' },      // Home
  { label: 'LoopLife', value: 'looplife' },          // Reusable
  { label: 'BambooRoot', value: 'bambooroot' },      // Kitchen
  { label: 'WildForm', value: 'wildform' },          // Fitness
  { label: 'EarthWear', value: 'earthwear' }         // 👕 Clothing
  ]
},

  {
    label: 'Price',
    elementType: 'input',
    type: 'number',
    placeholder: 'Enter price',
    name: 'price'
  },
  {
    label: 'Stock',
    elementType: 'input',
    type: 'number',
    placeholder: 'Enter stock',
    name: 'stock'
  },
  {
    label: 'Status',
    elementType: 'select',
    name: 'status',
    options: [
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' }
    ]
  }
];


