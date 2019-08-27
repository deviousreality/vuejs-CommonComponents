import FormTextarea from "../components/controls/form-textarea/form-textarea.vue";

export default {
    data() {
        return {
            input1: "Chewie! Get behind me! Get behind me! Can't get out that way. Looks like you managed to cut off our only escape route. Maybe you'd like it back in your cell, Your Highness. See-Threepio! See-Threepio! Yes sir? We've been cut off! Are there any other ways out of the cell bay?...What was that? I didn't copy! I said, all systems have been alerted to your presence, sir. The main entrance seems to be the only way in or out, all other information on your level is restricted.",            
        }
    },
    components: {
        formTextarea: FormTextarea
    }
}
