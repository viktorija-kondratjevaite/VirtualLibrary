﻿import React, { Component } from "react";
import axios from "axios";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "./Home.css";
import { HttpRequestPath } from "./Constants";
import { getProfile, getToken } from "./AuthService";
import { Button } from "semantic-ui-react";
import Modal from "react-responsive-modal";

import LocalizedStrings from "react-localization";
import { getLanguage } from "./LangService";

let strings = new LocalizedStrings({
  en: {
    select: "Select a book to return",
    author: "Author",
    title: "Title",
    code: "Code",
    returnUntil: "Return until",
    returnBook: "Return book",
    really: "Do you really want to return this book?",
    yes: "Yes",
    no: "No"
  },
  lt: {
    select: "Pasirinkite knygą, kurią norite grąžinti",
    author: "Autorius",
    title: "Pavadinimas",
    code: "Kodas",
    returnUntil: "Grąžinti iki",
    returnBook: "Grąžinti knygą",
    really: "Ar tikrai norite grąžinti šią knygą?",
    yes: "Taip",
    no: "Ne"
  }
});

export class ReturnBooks extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      showModal: false,
      code: null
    };
  }

  componentDidMount() {
    const user = getProfile();
    const token = getToken();
    axios.post(HttpRequestPath + "api/TakenBook", user).then(response => {
      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      for (var i = 0; i < response.data.length; i++) {
        var date = response.data[i].HasToBeReturned;
        var newDate = new Date(date);
        response.data[i].HasToBeReturned = newDate.toLocaleDateString(
          "en-US",
          options
        );
      }
      this.setState({
        books: response.data
      });
    });
  }

  onSelectBook = row => {
    window.location = './BookTaking';
  };

  _onSetLanguageTo(lang) {
    strings.setLanguage(lang);
  }

  render() {
    const lang = getLanguage();
    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      onSelect: this.onSelectBook
    };

    const modalStyle = {
      position: "fixed",
      zIndex: 1040,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };

    return (
      this._onSetLanguageTo(lang),
      (
        <div>
          <div className="boxBooks">
            <h3>{strings.select}</h3>
            <br />
            <BootstrapTable
              responsive
              data={this.state.books}
              selectRow={selectRow}
              hover
            >
              <TableHeaderColumn dataField="Author" isKey>
                {strings.author}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="Title">
                {strings.title}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="Code" hidden="true">
                {strings.code}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="HasToBeReturned">
                {strings.returnUntil}
              </TableHeaderColumn>
            </BootstrapTable>
          </div>
         
        </div>
      )
    );
  }
}
