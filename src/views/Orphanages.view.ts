import View from "../interfaces/View";
import Orphanage from "../models/Orphanage";
import ImagesView from "./Images.view";

export default  {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            openingHours: orphanage.openingHours,
            isOpenOnWeekends: orphanage.isOpenOnWeekends,
            images: ImagesView.renderMany(orphanage.images)
        }
    },

    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
}