import { createSlice } from '@reduxjs/toolkit'

const list = [
    { "id": "a8a30e11-56b1-4c23-a967-70d3305d0d77", "title": "werwer", "link": "http://ww.sdf", "status": "show", "duration": 2342 },
    { "id": "8d3d0905-7886-4d5d-8c1b-5dc64389553e", "title": "3425235", "link": "http://ww.sdf", "status": "show", "duration": 23 },
    { "id": "b29dde2a-f646-4fb8-af5c-f173c542ee00", "title": "jflsdflas;dfja;sjdfklajskldjf;lj;klsaj;lfj", "link": "http://ww.sdf", "status": "show", "duration": 3 },
    { "id": "8c12d7af-c160-4573-9c00-c5a05a1fb129", "title": "weqwrwd", "link": "http://ww.sdf", "status": "show", "duration": 212 },
    { "id": "6b7fddb7-92ac-4842-8c09-4fc462d8a3c2", "title": "dfdfdfg", "link": "https://github.com/Asabe", "status": "show", "duration": 21 },
    { "id": "3239f7c3-3c72-494c-a815-21021693c0fb", "title": "sdfsds", "link": "https://github.com/Asabeneh/30-Days-Of-JavaScript", "status": "show", "duration": 234 },
    { "id": "b14c631e-b58e-49f3-b0e9-87ed263ea857", "title": "werwersdfsdsdddfsdfsd", "link": "http://ww.sdf", "status": "show", "duration": 2342 },
    { "id": "125199ec-43bf-483a-8b5b-d2d096330454", "title": "23222", "link": "https://github.com/Asabeneh/30-Days-Of-Java", "status": "show", "duration": 22 },
    { "id": "5247b935-e9fd-44da-b732-b6e81141697f", "title": "hello", "link": "http://example.com/1", "status": "show", "duration": 4 },
    { "id": "2ee3d463-1298-488f-8ee8-61bacd6e2826", "title": "456789", "link": "https://github.com/Asabeneh/30-Days-Of-JavaScript", "status": "show", "duration": 567 },
    { "id": "3fa320e4-2c59-4276-9643-f73d5fc35b2e", "title": "hoisting", "link": "https://github.com/Asabeneh/30-Days-Of-JavaScript", "status": "show", "duration": 23 },
    { "id": "800af05a-17c9-4f1b-8c4c-955a43743f87", "title": "23432", "link": "https://github.com/Asabeneh/30-Days-Of-JavaScript", "status": "show", "duration": 232 },
    { "id": "4ef92852-014a-4af5-9124-f6e4913b57d5", "title": "456789hdfs", "link": "https://github.com/Asabeneh/30-Days-Of-JavaScript", "status": "show", "duration": 567 },
    { "id": "9d77e73b-313c-48eb-83fc-5182ddfc1db3", "title": "23422", "link": "https://github.com/Asabeneh/30-Days-Of-JavaScript", "status": "show", "duration": 2 },
    { "id": "3db365a5-6f24-4085-85b3-3998b25cc1b6", "title": "werwersdfsd", "link": "http://ww.sdf", "status": "show", "duration": 2342 },
    { "id": "40717d8b-8c33-4dc2-86ce-d30052a02577", "title": "sdfas", "link": "https://github.com/Asabe", "status": "show", "duration": 3 }
];

export const itemsSlice = createSlice({
    name: 'items',
    initialState: list,
    reducers: {
        createItem: (state) => {

        },
        updateItem: (state) => {

        },
        deleteItem: (state, { payload: id }) => {
            console.log(state, "/n/n");
        },
        changeStatus: (state) => {

        },
    }
})

export const { createItem, updateItem, changeStatus, deleteItem } = itemsSlice.actions;