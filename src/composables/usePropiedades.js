import { computed, ref } from 'vue'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import Swal from 'sweetalert2';


export default function usePropiedades() {
    const alberca = ref(false)

    const storage = useFirebaseStorage()
    const db = useFirestore()
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))

    async function deleteItem(id, urlImage) {
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
                const imageRef = storageRef(storage, urlImage)

                await Promise.all([
                    deleteDoc(docRef),
                    deleteObject(imageRef)
                ])
                

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



