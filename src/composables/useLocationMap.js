import { ref } from 'vue'

export default function useLocationMap() {
    const zoom = ref(15)
    const center = ref([20.9670526,-89.6241033])

    function pin(e) {
        const marker = e.target.getLatLng()
        center.value = [marker.lat, marker.lng]
    }
    
    return {
        zoom,
        center,
        pin
    }
}

