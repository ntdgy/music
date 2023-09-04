import { fetchHQPlaylist } from '@/web/api/playlist'
import { PlaylistApiNames } from '@/shared/api/Playlists'
import { useQuery } from '@tanstack/react-query'
import CoverRowVirtual from '@/web/components/CoverRowVirtual'

const reactQueryOptions = {
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 60, // 1 hour
    refetchOnMount: false,
}

const Hot = () => {
    const { data: hqPlayList, isLoading: isLoadingTop } = useQuery(
        [PlaylistApiNames.FetchHQPlaylistParams],
        () => fetchHQPlaylist({ limit: 500,before:0}),
        reactQueryOptions
    )
        
    const playlists = isLoadingTop? []: hqPlayList?.playlists || []

    return <CoverRowVirtual playlists={playlists} />
}

export default Hot