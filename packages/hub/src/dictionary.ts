import CommonTelemetryDictionary from '@juliannemarik/telemetry-dictionary-common';
import { ITelemetryCategory } from './types';

const authCategory:ITelemetryCategory = {
  id: 'Auth',
  definition: 'interactions involving authentication',
  actions: {}
}

const contentCategory:ITelemetryCategory =  {
  id : 'Content',
  definition: 'interactions which affect a content item',
  actions: {}
}

const dataCategory:ITelemetryCategory =  {
  id: 'Data',
  definition: 'interactions associated with altering how data is being visualized (i.e. in a chart, table, map etc.)',
  actions: {}
}

const engagementCategory:ITelemetryCategory = {
  id: 'Engagement',
  definition: 
    'interactions across content/groups/users which we designate as being very important in measuring user engagement - i.e. downloading, favoriting, following, etc.',
  actions: {
    favorite: {
      id: 'Favorite',
      elements: {
        actionsMenu: {
          id: 'Actions Menu',
          labels: {
            add: { id: 'Add' },
            remove: { id: 'Remove' }
          }
        },
        stickyHero: {
          id: 'Sticky Hero',
          labels: {
            add: { id: 'Add' },
            remove: { id: 'Remove' }
          }
        }
      }
    },
    download: {
      id: 'Download',
      elements: {
        actionsMenu: {
          id: 'Actions Menu',
          labels: {
            open: { id: 'Open' },
            start: { id: 'Start' }
          }
        },
        stickyHero: {
          id: 'Sticky Hero',
          labels: {
            open: { id: 'Open' },
            start: { id: 'Start' }
          }
        },
        downloadCard: {
          id: 'Download Card',
          labels: {
            complete: { id: 'Complete' },
            error: { id: 'Error' }
          }
        }
      }
    }
  }
}

const interactionCategory:ITelemetryCategory =  {
  id: 'Interaction',
  definition: 'interactions across content/groups/users which we designate as being less important in measuring user engagement, but still useful to track - i.e. opening a team info panel, viewing a content license, etc.',
  actions: {}
}

const groupsCategory:ITelemetryCategory =  {
  id: 'Groups',
  definition: 'interactions which affect a group item',
  actions: {}
}

const navigationCategory:ITelemetryCategory =  {
  id: 'Navigation',
  definition: 'interactions which effectively navigate the user to a new view',
  actions: {}
}

const searchCategory:ITelemetryCategory =  {
  id: 'Search',
  definition: 'interactions involving searching for items',
  actions: {}
}

const shareCategory:ITelemetryCategory = {
  id: 'Share',
  definition: 'interactions involving sharing items',
  actions: {}
}

const statusCategory:ITelemetryCategory = {
  id: 'Status',
  definition: 'non-interactive events for logging API responses - these will often have an associated interactive event logged in succession',
  actions: {}
}

const usersCategory:ITelemetryCategory = {
  id: 'Users',
  definition: 'interactions which affect a user item',
  actions: {}
}

class Dictionary extends CommonTelemetryDictionary {
  auth = authCategory;
  content = contentCategory;
  data = dataCategory;
  engagement = engagementCategory;
  interaction = interactionCategory;
  groups = groupsCategory;
  navigation = navigationCategory;
  search = searchCategory;
  share = shareCategory;
  status = statusCategory;
  users = usersCategory;
}

export const dictionary = new Dictionary ();