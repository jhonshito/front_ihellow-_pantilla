import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSplice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1"
    }),

    tagTypes: ['Ihellow'],
    endpoints: (buider) => ({
        login: buider.mutation({
            query: ({ namesuser, password }) => ({
                url: 'login',
                method: "POST",
                body: { namesuser: namesuser, password: password }
            }),
            providesTags: ['log']
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
            invalidatesTags: ['log']
        })
    })
});

export const { useLoginMutation, useMetricasMutation, useEstadisticasMutation, useLista_serviceMutation, useRegisterMutation, useCards_listMutation, useAdd_photoMutation } = apiSplice
