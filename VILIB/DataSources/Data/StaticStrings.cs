﻿using VILIB.Localization;

namespace VILIB.DataSources.Data
{
    public static class StaticStrings
    {
        public const string ExceptionsLogFile = "" +
                                                "Run" +
                                                "timeExceptions.txt";
        public const string BookFile = "BookList.txt";
        public const string UserFile = "faceImages.xml";
        public const string FaceDetectionTrainingFile = "\\UserInformation\\haarcascade_frontalface_alt2.xml";
        public const string EmailCredentialsFile = "email-details.txt";
        public const string PictureFilter = "jpg files(*.jpg)|*.jpg| png files(*.png)|*.png";
        public const int FaceImagesPerUser = 5;
        public const int EmailErr = 0;
        public const int UsernameErr = 1;
        public static string SubjectEmail = Translations.GetTranslatedString("warning");
        public static string WarningText = Translations.GetTranslatedString("returnThisBook");
        public static string WarningText2 = Translations.GetTranslatedString("until");
        public static string RegisteredEmailErr = "This email is already registered";
        public static string RegisteredUsernameErr = "This username is already registered";
        public static string RegisteredSuccessfully = "Registered successfully";

    }
}