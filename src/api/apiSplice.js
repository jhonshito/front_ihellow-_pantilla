import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSplice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1"
    }),

    tagTypes: ['Ihellow'],
    endpoints: (buider) => ({
        // esto hace el login
        login: buider.mutation({
            query: ({ namesuser, password }) => ({
                url: 'login',
                method: "POST",
                body: { namesuser: namesuser, password: password }
            }),
            providesTags: ['log']
        }),

        // Esto trae los datos del ususrio
        find_user: buider.query({
            query: ({id}) => `data_user/${id}`,
            providesTags: ['data']
        }),

        grafica: buider.mutation({
            query: ({id_landing, fechaInicial, fechaFinal}) => ({
                url: "grafica",
                method: "POST",
                body: {id_landing, fechaInicial, fechaFinal}
            })
        }),

        register: buider.mutation({
            query: ({token, email, phone, password, city, country, username}) => ({
                url: 'register',
                method: 'POST',
                body: {token: token, email: email, phone: phone, password: password, city: city, country: country, name: username}
            })
        }),

        metricas: buider.mutation({
            query: ({id_landing, fechaInicial, fechaFinal}) => ({
                url: 'metricas',
                method: 'POST',
                body: { id_landing, fechaInicial, fechaFinal }
            })
        }),

        estadisticas: buider.mutation({
            query: ({id_landing, fechaInicial, fechaFinal}) => ({
                url: 'estadistica',
                method: 'POST',
                body: { id_landing, fechaInicial, fechaFinal }
            })
        }),

        lista_service: buider.mutation({
            query: ({id_landing, fechaInicial, fechaFinal}) => ({
                url: 'lista_service',
                method: 'POST',
                body: {id_landing, fechaInicial, fechaFinal}
            })
        }),

        // company cards list
        cards_list: buider.mutation({
            query: ({ id }) => ({
                url: `company/cards`,
                method: 'POST',
                body: {id}
            })
        }),

        add_photo: buider.mutation({
            query: ({ id, formData }) => ({
                url: `add_foto/${id}`,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['data']
        }),

        // trae los datos de la card
        lista_card_by_id: buider.query({
            query: ({id}) => `listCardById/${id}`,
            providesTags:['list_card']
        }),

        // trae los datos de la landing
        lista_landing_by_id: buider.query({
            query: ({id}) => `listLandingById/${id}`,
            providesTags:['list_landing']
        }),

        // trae los datos del company 
        lista_company_by_id: buider.query({
            query: ({id}) => `dataCompanyByInd/${id}`,
            providesTags:['list_company']
        }),

        // agrego las imagenes de la card
        add_img_card: buider.mutation({
            query: ({id, formData}) => ({
                url: `add_img_card/${id}`,
                method: 'POST',
                body: formData
            })
        }),

        // actualiza la card
        updateCard: buider.mutation({
            query: ({id_card, title, addresses, side_a, side_b, logo_card, qr}) => ({
                url: 'update_card',
                method: 'PUT',
                body: {id_card, title, addresses, side_a, side_b, logo_card, qr}
            }),
            invalidatesTags:['list_card']
        }),

        // actualiza la landing
        update_landing: buider.mutation({
            query: ({id_landing,alias, url, seo, parameter}) => ({
                url: 'update_landing',
                method: 'PUT',
                body: {id_landing,alias, url, seo, parameter}
            }),
            invalidatesTags:['list_landing']
        }),

        // actualizo los datos de la card company
        update_company_card: buider.mutation({
            query: ({id_company,name,identify,phones,addresses,country,city,pagina_web,linkedin,instagram,facebook,twitter,tiktok,canal_youtube,enlace1,enlace2,enlace3,ciudad,barrio,direccion,recomendacion_card, logo_company}) => ({
                url: 'update_company_card',
                method: 'PUT',
                body: {id_company,name,identify,phones,addresses,country,city,pagina_web,linkedin,instagram,facebook,twitter,tiktok,canal_youtube,enlace1,enlace2,enlace3,ciudad,barrio,direccion,recomendacion_card, logo_company}
            }),
            invalidatesTags:['list_company']
        }),

        // subo el logo de la card company
        add_logo_company: buider.mutation({
            query: ({id, formData}) => ({
                url: `add_logo_company/${id}`,
                method: 'POST',
                body: formData
            })
        })
    })
});

export const { 
    useLoginMutation, 
    useMetricasMutation, 
    useEstadisticasMutation, 
    useLista_serviceMutation, 
    useRegisterMutation, 
    useCards_listMutation, 
    useAdd_photoMutation, 
    useFind_userQuery,
    useGraficaMutation,
    useLista_card_by_idQuery,
    useLista_landing_by_idQuery,
    useLista_company_by_idQuery,
    useAdd_img_cardMutation,
    useUpdateCardMutation,
    useUpdate_landingMutation,
    useUpdate_company_cardMutation,
    useAdd_logo_companyMutation
} = apiSplice
