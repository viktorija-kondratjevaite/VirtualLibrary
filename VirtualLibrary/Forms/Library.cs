﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using VirtualLibrary.Data;
using VirtualLibrary.Model;

namespace VirtualLibrary.Forms
{
    public partial class Library : Form
    {
        public Library()
        {
            InitializeComponent();

            BookListFromFile bookListFromFile = new BookListFromFile();
            IList<View.IBook> bookList = bookListFromFile.GetBookList();

            foreach (var book in bookList)
                bookListBox.Items.Add(book.Author + " " + book.Title);
        }

        private void ScannerOpenButton_Click(object sender, EventArgs e)
        {
            MessageBox.Show( System.Security.Principal.WindowsIdentity.GetCurrent().Name);
            BarcodeScanner barcodeScanner = new BarcodeScanner();
            barcodeScanner.ShowDialog();
        }

        private void BookListBox_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}
