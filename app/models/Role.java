package models;

import javax.persistence.*;

import io.ebean.Finder;
import io.ebean.Model;
import play.data.validation.*;

/**
 * 角色
 */
@Entity
public class Role extends Model {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int id;

    /**
     * 角色名称
     */
    @Constraints.Required
    public String name;

    public Role(String name) {
        this.name = name;
    }

    public static Finder<String, Role> find = new Finder<String, Role>(
            Role.class
    );
}
