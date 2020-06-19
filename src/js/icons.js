import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faPlus, faSearch, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'

Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(faUpload)
library.add(faCog)
library.add(faSearch)
library.add(faPlus)
