import { computed, ref } from 'vue'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'
import Swal from 'sweetalert2';


export default function usePropiedades() {
    const alberca = ref(false)

    const db = useFirestore()
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))

    async function deleteItem(id) {  
        Swal.fire({
            title: "¿Estas seguro que quieres eliminar el registro?",
            text: "Esta acción no se podra revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const docRef = doc(db, 'propiedades', id)
                await deleteDoc(docRef)
                Swal.fire({
                    title: "Eliminado!",
                    text: "El registro ha sido eliminado.",
                    icon: "success"
                });
            }
        });

    }

    const propiedadesFiltradas = computed(() => {
        return alberca.value ? 
            propiedadesCollection.value.filter(propiedad => propiedad.alberca) : 
            propiedadesCollection.value
    })

    return {
        alberca,
        propiedadesCollection,
        propiedadesFiltradas,
        deleteItem
    }
}



