import * as Yup from 'yup';

export default Yup.object().shape({
    name: Yup.string().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    about: Yup.string().required().max(300),
    instructions: Yup.string().required(),
    openingHours: Yup.string().required(),
    isOpenOnWeekends: Yup.string().required(),
    images: Yup.array(
        Yup.object().shape({
            path: Yup.string().required()
        })
    )
});