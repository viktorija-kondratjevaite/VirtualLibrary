﻿using System;
using System.Windows.Forms;
using VirtualLibrary.DataSources.Data;
using VirtualLibrary.Localization;
using VirtualLibrary.Repositories;

namespace VirtualLibrary.Forms
{
    public partial class Login : Form
    {
        private readonly IUserRepository _mUserRepository;
        private Library _libraryForm;
        public Login(IUserRepository userRepository, Library libraryForm)
        {
            _mUserRepository = userRepository;
            _libraryForm = libraryForm;
            InitializeComponent();
        }

        public string Username
        {
            get => usernameTextBox.Text;
            set => usernameTextBox.Text = value;
        }

        public string Password
        {
            get => passwordTextBox.Text;
            set => passwordTextBox.Text = value;
        }

        private void UsernameTextBox_TextChanged(object sender, EventArgs e)
        {
            StaticDataSource.CurrUser = usernameTextBox.Text;
        }

        private void LoginButton_Click(object sender, EventArgs e)
        {
            Close();
            if (_mUserRepository.Login(Username, Password))
            {
                _libraryForm.ShowDialog();
            }
            else
            {
                MessageBox.Show(Translations.GetTranslatedString("userNotFound"));
            }
        }

        private void Login_Load(object sender, EventArgs e)
        {

        }
    }
}