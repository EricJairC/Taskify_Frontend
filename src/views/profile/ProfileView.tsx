import { useAuth } from '@/hooks/useAuth'
import ProfileForm from './ProfileForm'
import Spinner from '@/components/spinner/Spinner'

export default function ProfileView() {

    const { data, isLoading } = useAuth()

    if(isLoading) return <Spinner/>

    if(data) return <ProfileForm data={data}/>
}
