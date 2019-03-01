import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons'

const addFontAwesomeIcons = () => {
	library.add(faEnvelope, faCheck, faTimes)
}

export default addFontAwesomeIcons
