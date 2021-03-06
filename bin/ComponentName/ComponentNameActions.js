import Reflux from 'reflux';

const ComponentNameActions = {
    init: Reflux.createAction({asyncResult: true}),
    destroy: Reflux.createAction({sync: true})
};

const text = 'this is data coming from action';

ComponentNameActions.init.listen(function() {
    (Math.random() > 0.5) ? this.completed({text}) : this.failed();
});

export default ComponentNameActions;
