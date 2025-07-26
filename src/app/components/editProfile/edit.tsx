import { AuthContext } from '@/app/context/Authcontext'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useContext} from 'react'
import EditProfilePage from '../editProfile'

export default function EditProfile() {
    const {editProfile,setEditProfile}:any =useContext(AuthContext)
    function open() {
        setEditProfile(true)
    }
    const close=()=> {
        
        setEditProfile(false)
    }

    return (
        <>
            <Dialog open={editProfile} as="div" className="relative z-10 focus:outline-none" onClose={()=>setEditProfile(false)}>
                <div className="fixed inset-0 z-[150] w-screen overflow-y-auto bg-[rgba(91,112,131,.4)]">
                <div className="flex min-h-full h-full items-center justify-center mobile:p-4">
                    <DialogPanel
                        transition
                        className="w-full max-h-full overflow-y-scroll max-w-xl mobile:rounded-xl z-[20] bg-white/5  backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <EditProfilePage onBack={close}/>
                    </DialogPanel>
                </div>
                </div>
            </Dialog>
        </>
    )
}
