import Reflux from 'reflux';
import ComponentNameActions from './ComponentNameActions';

export const defaultState = {
    isLoading: false,
    isError: false
};

class ComponentNameStore extends Reflux.Store {

    constructor() {
        super();

        this.listenables = ComponentNameActions;

        this.state = {...defaultState};
    }

    /**
     * @listens ComponentNameActions.init
     */
    onInit() {
        this.setState({
            isLoading: true
        });
    }

    /**
     * @listens ComponentNameActions.init.completed
     */
    onInitCompleted({text}) {
        this.setState({
            text,
            isLoading: false
        });
    }

    /**
     * @listens ComponentNameActions.init.failed
     */
    onInitFailed() {
        this.setState({
            isLoading: false,
            isError: true
        });
    }

    /**
     * @listens ComponentNameActions.destroy
     */
    onDestroy() {
        this.setState(defaultState);
    }
}

export default Reflux.initStore(ComponentNameStore);
