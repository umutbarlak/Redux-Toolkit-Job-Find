import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { addJob } from "../redux/slices/jobSlice";
import { typeOptions, statusOptions } from "../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const jobState = useSelector((store) => store.jobReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());

    formData.id = v4();
    formData.date = new Date().toLocaleDateString();

    console.log(formData);

    axios
      .post("http://localhost:3020/jobs/", formData)
      .then(() => {
        toast.success("İş eklendi");
        dispatch(addJob(formData));
        navigate("/");
      })
      .catch(() => toast.error("Üzgünüz, eklerken bir sorunla karşılaşıldı"));
  };

  const removeDuplicates = (key) => {
    const arr = jobState?.jobs.map((job) => job[key]);

    const filtred = arr.filter((item, index) => arr.indexOf(item) === index);

    return filtred;
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="position">Pozisyon</label>
            <input list="position_list" name="position" type="text" required />
            <datalist id="position_list">
              {removeDuplicates("position").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div className="field">
            <label htmlFor="company">Şirket</label>
            <input list="company_list" name="company" type="text" required />
            <datalist id="company_list">
              {removeDuplicates("company").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div className="field">
            <label htmlFor="location">Lokasyon</label>
            <input list="location_list" name="location" type="text" required />
            <datalist id="location_list">
              {removeDuplicates("location").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div className="field">
            <label>Durum</label>
            <select name="status" required>
              <option value="" hidden>
                Seçiniz
              </option>
              {statusOptions?.map((text, i) => (
                <option value={text} key={i}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Tür</label>
            <select name="type" required>
              <option value="" hidden>
                Seçiniz
              </option>
              {typeOptions.map((text, i) => (
                <option value={text} key={i}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div className="add-btn">
            <button>EKLE</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
