package models;

import java.io.*;
import javax.persistence.*;

import io.ebean.Finder;
import io.ebean.Model;
import models.User;

@Entity
public class Avatar extends Model {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int id;

	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	public User user;
	
	public String contentType;

	@Lob
	public byte[] data;
	
    public Avatar(User user, String contentType, File file) {
		this.contentType = contentType;
		this.user = user;

		this.data = new byte[(int) file.length()];

        /* write the image data into the byte array */
		InputStream inStream = null;
		try {
			inStream = new BufferedInputStream(new FileInputStream(file));
			inStream.read(this.data);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (inStream != null) {
				try {
					inStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
    }

	public static Finder<Integer, Avatar> find =
			new Finder<Integer, Avatar>(Avatar.class);

}
