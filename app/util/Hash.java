package util;

import org.mindrot.jbcrypt.BCrypt;


import java.util.UUID;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
 
import org.apache.commons.codec.binary.Hex;
 
/**
 * Password utility class.  This handles password encryption and validation.
 * <p/>
 * User: yesnault
 * Date: 25/01/12
 */
public class Hash {

    /**
     * Create an encrypted password from a clear string.
     *
     * @param clearString the clear string
     * @return an encrypted password of the clear string
     */
    public static String createPassword(String clearString) {
        return BCrypt.hashpw(clearString, BCrypt.gensalt());
    }

    /**
     * @param candidate         the clear text
     * @param encryptedPassword the encrypted password string to check.
     * @return true if the candidate matches, false otherwise.
     */
    public static boolean checkPassword(String candidate, String encryptedPassword) {
        if (candidate == null) {
            return false;
        }
        if (encryptedPassword == null) {
            return false;
        }
        return BCrypt.checkpw(candidate, encryptedPassword);
    }
}
