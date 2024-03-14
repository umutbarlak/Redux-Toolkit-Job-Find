import { useDispatch } from "react-redux";
import { sortOptions, statusOptions, typeOptions } from "../constants";
import {
  clearFilters,
  filterBySearch,
  sortByJobs,
} from "../redux/slices/jobSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const Filter = () => {
  const [text, setText] = useState();
  const dispatch = useDispatch();
  // const debounceText = useDebounce(text, 500);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ text, name: "company" }));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Fitreleme Formu</h2>
      <form>
        <div>
          <label>Şirket İsmine Göre Ara</label>
          <input
            onChange={(e) => {
              setText(e.target.value);
              dispatch(filterBySearch({ name: "company", text: text }));
            }}
            type="text"
          />
        </div>

        <div>
          <label>Durum</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "status", text: e.target.value }))
            }
          >
            <option value={""} hidden>
              Seçiniz
            </option>
            {statusOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "type", text: e.target.value }))
            }
          >
            <option value={""} hidden>
              Seçiniz
            </option>
            {typeOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sırala</label>
          <select onChange={(e) => dispatch(sortByJobs(e.target.value))}>
            <option value={""} hidden>
              Seçiniz
            </option>
            {sortOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => dispatch(clearFilters())}
          type="reset"
          className="filter-btn"
        >
          Filtreleri Sıfırla
        </button>
      </form>
    </section>
  );
};

export default Filter;
