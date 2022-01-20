import React, { useEffect, Component } from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import firebase from '../../Config/fbConfig';
import { withRouter } from "react-router-dom";


class DetailFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            userId: '',
            name:'',
            field: '',
            joinYear: '',
            birthday: '',
            status: '',
            feedback: [],
        };
    }


    componentDidMount() {
        const id = this.props.match.params.idRoute;
        const ref = firebase.firestore().collection('teachers').doc(id);
        console.log(ref)
        console.log(id)
        ref.get().then((doc) => {
            if (doc.exists) {
                const detailFeedback = doc.data();
                this.setState({
                    key: doc.id,
                    userId: detailFeedback.userId,
                    name: detailFeedback.name,
                    field: detailFeedback.field,
                    joinYear: detailFeedback.joinYear,
                    birthday: detailFeedback.birthday,
                    status: detailFeedback.status,
                    feedback: detailFeedback.feedback,
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            console.log(this.state)
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }

    

    render() {
        return (
            <>
                <h1>{this.state.name}</h1>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Student's Email</TableCell>
                                <TableCell align="center">Rate</TableCell>
                                <TableCell align="center">Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.feedback.map(fback =>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {fback.postedBy}
                                    </TableCell>
                                    <TableCell align="center">{fback.rate}</TableCell>
                                    <TableCell align="center">{fback.text}</TableCell>

                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default withRouter(DetailFeedback);
