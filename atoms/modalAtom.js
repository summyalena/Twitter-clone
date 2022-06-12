import {atom} from 'recoil'

// recoil is a state management hook that is like redux but simpler than redux to use.
// before we use recoil, we have to create an atom folder and an index page
// this state would be distributed all over the application
export const modalState = atom({
    key:"modalState",
    default:false,
})

export const postIdState = atom({
    key:"postIdState",
    default:""
})
