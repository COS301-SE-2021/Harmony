import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export class VeriCodeForm extends Component {
	render() {
		const { values, handleChange } = this.props;
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom>
					Please enter Verification Code sent to email
				</Typography>
				<Grid container spacing={24}>

					<Grid item xs={12}>
						<TextField
							required
							id="code"
							name="code"
							label="Code"
							onChange={handleChange("code")}
							defaultValue={values.code}
							fullWidth
							autoComplete="code"
						/>
					</Grid>

				</Grid>
			</React.Fragment>
		);
	}
}

export default VeriCodeForm;
