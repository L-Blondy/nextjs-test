import React from 'react';
import deepEqual from 'react-fast-compare'

interface Options {
	ignoreFunctions?: boolean
}

// TYPE INFERENCE WITH GENERIC PROPS MAY NOT WORK

function pure<TargetProps extends {}>(TargetComponent: React.ComponentType<TargetProps>, options: Options = {}) {

	if (options.ignoreFunctions) {
		return class Pure extends React.Component<TargetProps>{

			shouldComponentUpdate(nextProps: TargetProps) {

				for (let prop in nextProps) {
					if (typeof nextProps[ prop ] === 'function')
						continue

					if (!deepEqual(this.props[ prop ], nextProps[ prop ]))
						return true
				}

				return false
			}

			render() {
				return <TargetComponent {...this.props as TargetProps} />
			}
		}
	}

	return class Pure extends React.PureComponent<TargetProps>{

		render() {
			return <TargetComponent {...this.props as TargetProps} />
		}
	}
}

export default pure;