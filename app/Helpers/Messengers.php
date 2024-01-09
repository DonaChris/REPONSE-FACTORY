<?php

namespace App\Helpers;

class Messengers

{
    const TEXT = [
        "error" => [
            "session_general" => "Veuillez patienter puis réessayer plus tard. Si le problème persiste, veuillez vous reconnecter à nouveau",
            "password" => [
                "incorrect" => "Mot de passe <u><b>incorrect</b></u>",
                "non_identique" => "Mot de passe non identique",
                "jamais_identique_a_lancien" => "Doit être différent de votre mot de passe actuel"
            ],
            "compte" => [
                "statut_bloquer" => "Votre compte est bloqué",
                "session_expirer" => "Votre session a expirée, veuillez-vous reconnecter svp !",
                "statut_inactif" => "Compte inactif, veuillez confirmer votre adresse email."
            ],
            "token" => [
                "invalide" => "Token invalide ou expiré"
            ],
            "inconnu" => "Un problème est survenu. Veuillez patienter puis réessayer plus tard.",
            "email" => [
                "deja_utiliser" => "Adresse e-mail déjà utilisée.",
                "invalide" => "Adresse e-mail invalide.",
                "aucun_compte" => "Aucun compte associé à l'adresse e-mail."
            ],
            "telephone" => [
                "deja_utiliser" => "Téléphone déjà utilisé.",
                "aucun_compte" => "Aucun compte associé à ce numéro de téléphone."
            ],
            "user_name" => [
                "deja_utiliser" => "Nom d'utilisateur déjà utilisé."
            ],
            "image" => [
                "telechargement" => "Une erreur est survenu, lors du téléchargement de cette image",
                "size" => "Image trop volumineux. Taille maximum: ",
                "mimes_img" => "Format non accepté. Image doit être (.png, .jpg, .jpeg)",
                "mimes_pdf" => "Format non accepté. Le fichier doit être un document PDF",
                "mimes_img_pdf" => "Format non accepté. Le fichier doit être (.png, .jpg, .jpeg, .pdf)"
            ],
            "champs" => [
                "requis" => "Ce champ est errorné. Veuillez bien le renseigné"
            ],
            "integer" => [
                "*" => "Doit être un nombre entier",
                "min" => "Doit être un nombre entier et supérieur à: ",
                "max" => "Doit être un nombre entier et inférieur à: "
            ],
            "string" => [
                "min" => " caractère(s) au minumum",
                "max" => " caractère(s) au maximum"
            ],
            "date" => [
                "format" => "Date invalide ou mauvais format"
            ],
            "general" => [
                "default" => "Un problème est survenu, veuillez réessayer plus tard",
                "edtion" => "Aucune modification effectuée"
            ]
        ],
        "success" => [
            "reset_password" => [
                "title" => "Mot de passe réinitialisé",
                "message_password_reset" => "Votre mot de passe a été réinitialiser avec succès. Vous pouvez désormais vous connecter à votre compte.",
                "message_password_changed" => "Votre mot de passe a été mis a jour avec succès."
            ],
            "general" => [
                "edtion" => "Modification effectuée avec succès"
            ]
        ]
    ];


    public static function statusMessage($statut = "danger", $icon = "alert", $title = "Problème survenu", $data = []): array
    {
        $statusMsg = [
            "statusMsg" => [
                "type" => $statut,
                "icon" => $icon,
                "title" => $title,
                "data" => $data
            ]
        ];

        return $statusMsg;
    }

    public static function statusSuccessMessage($statut = "success", $icon = "check-circle", $title = "Modification effectuée", $data = ["general" => "Modification effectuée avec succès"])
    {
        return self::statusMessage($statut, $icon, $title, $data);
    }
}
