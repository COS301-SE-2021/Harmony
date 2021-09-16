import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export class NewPassForm extends Component {
	render() {
		const { values, handleChange } = this.props;
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom>
					Personal Details
				</Typography>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<TextField
							required
							id="password1"
							name="password1"
							label="Address line 1"
							onChange={handleChange("password1")}
							defaultValue={values.address1}
							fullWidth
							autoComplete="password1"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id="password2"
							name="password2"
							label="Address line 1"
							onChange={handleChange("password2")}
							defaultValue={values.password2}
							fullWidth
							autoComplete="password2"
						/>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export default NewPassForm;
