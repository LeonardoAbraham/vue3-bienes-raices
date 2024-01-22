
<script setup>
    import usePropiedades from '@/composables/usePropiedades'
    import Propiedad from '../components/Propiedad.vue'

    const { propiedadesCollection } = usePropiedades()
</script>

<template>
    <h1 class="text-center text-h3 font-weight-bold my-5">Nuestras Propiedades</h1>

    <v-card flat class="py-10">

        <v-row>
            <Propiedad 
                v-for="propiedad in propiedadesCollection"
                :key="propiedad.id"
                :propiedad="propiedad"
            />
        </v-row>

    </v-card>
</template>
